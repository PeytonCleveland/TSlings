import { useEffect, useState } from "react";
import { Box, Text } from "ink";
import { TestFailure, CompileFailure } from "../../../types/evaluation";

const ComplileFailureMessage = ({ failure }: { failure: string }) => {
  const [snippet, setSnippet] = useState<string>("");

  useEffect(() => {
    const getSnippet = async () => {
      const dir = import.meta.dir.split("/src/cli/components")[0];

      const line = failure.split("(")[1].split(",")[0];

      const file = Bun.file(`${dir}/${failure.split("(")[0]}`);

      const content = await file.text();
      const lines = content.split("\n");
      let snippet = "";
      lines.slice(parseInt(line) - 5, parseInt(line) + 5).forEach((l, i) => {
        snippet += `${parseInt(line) - 5 + i + 1}:   ${l}\n`;
      });

      setSnippet(snippet);
    };

    getSnippet();
  }, []);

  return (
    <>
      <Text>{failure}</Text>
      <Text>{snippet}</Text>
    </>
  );
};

const Failure = ({ failure }: { failure: TestFailure | CompileFailure }) => {
  const isTestFailure = failure instanceof TestFailure;

  return (
    <Box flexDirection="column">
      <Box marginTop={5}>
        <Text bold backgroundColor="red" color="#000">
          &nbsp;{"✘"}&nbsp;
          {isTestFailure ? "Test Failed" : "Compile Failed"}
          &nbsp;{"✘"}&nbsp;
        </Text>
      </Box>
      <Box flexDirection="column" marginTop={1}>
        {isTestFailure ? (
          <Text>{failure.text}</Text>
        ) : (
          <ComplileFailureMessage failure={failure.text} />
        )}
      </Box>
    </Box>
  );
};

export default Failure;
