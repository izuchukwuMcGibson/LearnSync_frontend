import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  syntax: string;
}

let diagramCount = 0;
let hasConfiguredMermaid = false;

const removeCodeFence = (syntax: string) =>
  syntax
    .trim()
    .replace(/^```(?:mermaid)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

const MermaidDiagram = ({ syntax }: MermaidDiagramProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const source = removeCodeFence(syntax);

    const renderDiagram = async () => {
      if (!containerRef.current || !source) return;

      setError(false);
      containerRef.current.replaceChildren();
      const id = `learnsync-diagram-${diagramCount++}`;

      try {
        const { default: mermaid } = await import("mermaid");
        if (!hasConfiguredMermaid) {
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: "strict",
            theme: "base",
            themeVariables: {
              primaryColor: "#e0edff",
              primaryTextColor: "#112240",
              primaryBorderColor: "#2b4c7e",
              lineColor: "#64748b",
              secondaryColor: "#f8fafc",
              tertiaryColor: "#eff6ff",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            },
            flowchart: {
              htmlLabels: false,
              curve: "basis",
            },
          });
          hasConfiguredMermaid = true;
        }

        const { svg, bindFunctions } = await mermaid.render(id, source);
        if (cancelled || !containerRef.current) return;

        containerRef.current.innerHTML = svg;
        bindFunctions?.(containerRef.current);
      } catch (renderError) {
        console.error("Unable to render Mermaid diagram", renderError);
        if (!cancelled) setError(true);
      }
    };

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [syntax]);

  if (error) {
    return (
      <div className='rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800'>
        This concept map could not be displayed. Please try regenerating the
        summary.
      </div>
    );
  }

  return <div ref={containerRef} className='mermaid-diagram' aria-label='Concept relationship diagram' />;
};

export default MermaidDiagram;
