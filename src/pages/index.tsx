import { Box, Button, Text } from "@yamada-ui/react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [subjecsts, setSubjects] = useState<AxiosResponse>();
  const array = [
    [ 11, 12, 13, 14, 15],
    [ 21, 22, 23, 24, 25],
    [ 31, 32, 33, 34, 35],
    [ 41, 42, 43, 44, 45],
    [ 51, 52, 53, 54, 55],
  ]

  const postSubject = async (e: number) => {
    await axios.post("http://172.19.0.2:8080/api/subject/post", {name: "オブジェクト指向", time: e, user_id: 1, teacher_id: 1})
    axios.get("http://172.19.0.2:8080/api/subject/").then((subjects) => setSubjects(subjects)).catch(error => console.error(error));
  }
  
  useEffect(() => {
    axios.get("http://172.19.0.2:8080/api/subject/").then((subjects) => setSubjects(subjects)).catch(error => console.error(error));
  },[])

  return (
      <Box display="flex" justifyContent="center" alignContent="center" gap="3">
        {array.map((element) => 
          <Box display="flex" flexDirection="column" width="20vh" key={element.toString}>
            {element.map((e) => 
              <Button height="15vh" border="1px solid #444" background="white" onClick={() => postSubject(e)} display="flex" flexDirection="column" key={e}>
                <Box width="100%" fontSize="80%">{e % 10}</Box>
                <Box fontSize="80%" height="50%">{
                  subjecsts?.data.map((s) => {
                    if (s.time === e) {
                      return <Text key={s.id}>{s.name}</Text>
                    }
                  })}
                </Box>
              </Button>
            )}
          </Box>
        )}
      </Box>
  );
}
