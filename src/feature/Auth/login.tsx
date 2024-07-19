import { Box, Heading, Text } from "@yamada-ui/react"
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

const LoginPage = () => {
    const [data, setData] = useState<AxiosResponse>();

    useEffect(() => {
        axios.get("http://172.19.0.2:8080/api/user/").then((res) => setData(res)).catch(error => console.error(error));
    }, []);
    
    return (
        <Box>
            <Heading>Login</Heading>
            <Text>ようこそ{data?.data.name}さん</Text>
        </Box>
    )
}

export default LoginPage;