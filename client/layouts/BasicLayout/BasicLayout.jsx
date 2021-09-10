
import React from 'react';
import { Container } from "semantic-ui-react";
import Header from "@/components/Header";
export default function BasicLayout(props) {
    const { children } = props;
    return (
        <Container fluid className='basic-layout'>
            <Header />
            <Container className='content'>
                {children}
            </Container>

        </Container>
    )
}

