import { buscarClasses } from "@/actions/classes";
import ClassesClient from "./components/ClassesClient";

export default async function ClassesPage() {
  const { data: classes } = await buscarClasses();

  return <ClassesClient classes={classes ?? []} />;
}