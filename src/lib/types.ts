export interface ExamMeta {
  institutionName: string;
  version: "Bangla" | "English" | "";
  time: string;
  date: string;
  classLevel: string;
  chapter: string;
}

export interface ExamData {
  institutionName: string;
  version: "Bangla" | "English";
  time: string;
  date: string;
  classLevel: string;
  chapter: string;
  questions: string[];
}

export const INITIAL_META: ExamMeta = {
  institutionName: "",
  version: "",
  time: "",
  date: "",
  classLevel: "",
  chapter: "",
};
