import { useEffect } from "react";
import React, { useState } from "react";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { WikiPageIdentifier, wikitopage } from "../../types/WikiPageIdentifier";
import { BlackText } from "../../components/texts/BlackText";

interface PageProps {
  pageName: WikiPageIdentifier;
}

export const WikiPage = ({ pageName }: PageProps) => {
  const [content, setContent] = useState<JSX.Element>(<div>Loading...</div>);

  useEffect(() => {
    setContent(
      wikitopage.find((page) => page.name === pageName)?.page || (
        <div>Page not found</div>
      )
    );
  }, [pageName]);

  return <BlankPage>{content}</BlankPage>;
};
