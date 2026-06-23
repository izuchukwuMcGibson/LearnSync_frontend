const fs = require('fs');

const path = 'src/pages/QuizPage.tsx';
let data = fs.readFileSync(path, 'utf8');

data = data.replace(/  interface QuizQuestion {[\s\S]*?const \[questions, setQuestions\] = useState<QuizQuestion\[\]>\(\[\]\);/, `  interface QuizQuestion {
  question: string;
  codeSnippet?: string;
  options?: QuizOption[]; // Optional for code questions
  difficulty: string; // e.g., "Easy", "Medium", "Hard"
  round: number; // 1 or 2
  type?: "mcq" | "code";
  starterCode?: string;
  testCode?: string;
  language?: string;
  expectedOutput?: string;
}

const QuizPage: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);`);

fs.writeFileSync(path, data);
console.log('Fixed QuizQuestion interface!');
