import { useEffect } from "react";
import { Box, Text, useApp } from "ink";
import { $ } from "bun";

const Congrats = () => {
  const { exit } = useApp();

  useEffect(() => {
    $`clear`;

    setTimeout(() => exit(), 1000);
  }, []);

  return (
    <Box flexDirection="column" alignItems="center">
      <Box marginTop={5}>
        <Text bold backgroundColor="cyan" color="#000">
          &nbsp;{"🎉"}&nbsp;&nbsp;Congratulations! You've completed all the
          exercises!&nbsp;{"🎉"}&nbsp;
        </Text>
      </Box>
      <Box marginTop={1} marginBottom={5}>
        <Text>Run </Text>
        <Text bold>tslings clear</Text>
        <Text> to reset your progress</Text>
      </Box>
    </Box>
  );
};

export default Congrats;
