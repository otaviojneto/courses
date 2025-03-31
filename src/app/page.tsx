import { redirect } from "next/navigation";

const Home: React.FC = () => {
  redirect("/courses"); // Faz o Redirecionamento imediato, pois não tem home
};

export default Home;
