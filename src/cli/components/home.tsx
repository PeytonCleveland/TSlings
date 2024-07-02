import { useEffect, useState } from "react";
import { Box, Text, useApp } from "ink";
import chokidar from "chokidar";
import type { Progress } from "../../../types/progress";
import { loadProgress, markCompleteAndLoadNext } from "../progress";
import { evaluateFile } from "../evaluate";
import Congrats from "./congrats";
import Failure from "./failure";

const Home = () => {
  const { exit } = useApp();
  const [userProgress, setUserProgress] = useState<Progress>();
  const [currentFailure, setCurrentFailure] = useState<any>();

  const completedAllExercises =
    userProgress?.incomplete.length === 0 &&
    userProgress?.current === undefined;

  useEffect(() => {
    const getProgress = async () => {
      setUserProgress(await loadProgress());
    };

    getProgress();
  }, []);

  useEffect(() => {
    const watcher = chokidar.watch("./exercises", {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
    });

    watcher
      .on("change", async (path) => {
        const status = await evaluateFile(path);
        if (status.passing) {
          const exercise = {
            name: path.split("/")[2],
            category: path.split("/")[1].split(" ")[1],
          };
          setCurrentFailure(null);
          await markCompleteAndLoadNext(exercise);
          setUserProgress(await loadProgress());
        } else {
          if (status.error?.code !== 0) {
            setCurrentFailure(status.error);
          }
        }
      })
      .on("unlink", (path) => console.log(`File ${path} has been removed`));

    const closeWatcher = async () => {
      await watcher.close();
    };

    // Cleanup watcher on component unmount
    return () => {
      closeWatcher();
    };
  }, [exit]);

  if (!userProgress) {
    return <Text>Loading...</Text>;
  }

  if (completedAllExercises) {
    return <Congrats />;
  }

  if (currentFailure) {
    return <Failure failure={currentFailure} />;
  }

  return (
    <Box flexDirection="column">
      <Box marginTop={2} marginBottom={1} marginLeft={1}>
        <Text bold backgroundColor="cyan" color="#000">
          &nbsp;{"🏎️"}&nbsp;&nbsp;Welcome to TSlings&nbsp;{"🏎️"}&nbsp;
        </Text>
      </Box>
      <Box marginBottom={1} marginLeft={1}>
        <Text bold>Instructions:</Text>
        <Text> Modify the files in the </Text>
        <Text bold>exercises</Text>
        <Text> directory to complete the exercises.</Text>
      </Box>
      <Box marginBottom={2} marginLeft={1}>
        <Text>When complete, remove the </Text>
        <Text bold>// I AM NOT DONE</Text>
        <Text> line and save to run the tests</Text>
      </Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        marginLeft={1}
        marginBottom={2}
      >
        <Box flexDirection="column">
          <Box marginBottom={1}>
            <Text color="greenBright">Completed Exercises ✅</Text>
          </Box>
          {userProgress.completed.length > 0 ? (
            <Text>{userProgress.completed.length} exercises completed</Text>
          ) : (
            <Text dimColor>Nothing to see here...</Text>
          )}
        </Box>
        <Box flexDirection="column">
          <Box marginBottom={1}>
            <Text color="yellowBright">Current Exercise ⏳</Text>
          </Box>
          <Box marginLeft={1}>
            <Box marginBottom={1}>
              <Text bold>Category:&nbsp;</Text>
            </Box>
            <Text italic>{userProgress.current.category}</Text>
          </Box>
          <Box marginLeft={1}>
            <Text bold>Solving:&nbsp;</Text>
            <Text italic>{`${userProgress.current.name}.ts`}</Text>
          </Box>
        </Box>
        <Box marginRight={2} flexDirection="column" alignItems="flex-end">
          <Text color="redBright">Incomplete Exercises 👀</Text>
          <Box flexDirection="column" marginTop={1}>
            {userProgress.incomplete.length > 0 ? (
              <>
                {userProgress.incomplete.slice(0, 4).map((exercise) => (
                  <Box key={exercise.name}>
                    <Text>{exercise.name}</Text>
                  </Box>
                ))}
                {userProgress?.incomplete.length! > 4 && (
                  <Text dimColor>
                    +{userProgress.incomplete.length - 4} More
                  </Text>
                )}
              </>
            ) : (
              <Text dimColor>Nothing to see here...</Text>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
