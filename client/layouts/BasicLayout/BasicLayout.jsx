
import React from 'react';
import { Container } from "semantic-ui-react";
import Header from "@/components/Header";
import HeaderBlack from "@/components/HeaderBlack";

export default function BasicLayout(props) {
    const { children } = props;
    return (
        <>
            <HeaderBlack />
            <Container fluid className='basic-layout'>
                <Header />
                <Container className='content'>
                    {children}
                </Container>

            </Container>
        </>

    )
}

