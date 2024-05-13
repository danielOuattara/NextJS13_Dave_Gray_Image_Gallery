import Gallery from "@/app/components/Gallery";

type Props = {
  params: {
    myParams: (string | undefined)[];
  };
};

export function generateMetadata({ params: { myParams } }: Props) {
  const searchTerm = myParams?.[0] ?? "curated";
  const page = myParams?.[1] ?? "1";
  return {
    title: `Results for ${searchTerm} - Page ${page}`,
  };
}

export default function SearchResults({ params: { myParams } }: Props) {
  const searchTerm = myParams?.[0] ?? "curated";
  const page = myParams?.[1] ?? "1";
  return <Gallery searchTerm={searchTerm} page={page} />;
}
