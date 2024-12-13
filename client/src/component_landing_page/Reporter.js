import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import {Card, Button}from 'react-bootstrap';
import WebFormSubmit from './WebFormSubmit';
const ReportingPage = () =>{
    const style_reporting_page = {
        margin: '10px',
        padding: '10px',
        width: '100%',
        height: "100%",
    };
    const style_card = {
        width: '10cm',
        backgroundColor: "#8D7B68",
        color: "#F1DEC9"
    }
    const style_button = {
        margin: '10px',
        backgroundColor: "#8D7B68"
    }
    const style_button_react = {
        backgroundColor: "#8D7B68",
        background: "#8D7B68"
    }
    
    return(
        <div class="d-flex flex-column justify-content-center align-items-center" style={style_reporting_page}>
            <Card style={style_card}>
                <div class="d-flex flex-column justify-content-center align-items-center" style={style_reporting_page}>
                <h1>Reporting App</h1>
                <div class="container d-flex flex-row justify-content-center align-items-center">
                    <div style={style_button}>
                        <LinkContainer to="/life" >
                        <Button variant="" style={style_button_react}>
                                Lifestyle
                            </Button>
                        </LinkContainer>
                    </div>
                    <div style={style_button}>
                        <LinkContainer to="/pgx" >
                        <Button variant="" style={style_button_react}>
                                Pharmacogenomic
                        </Button>
                        </LinkContainer>
                    </div>
                </div>
                </div>
            </Card>

            <div>
                <WebFormSubmit/>
            </div>

        </div>
    )
}

export default ReportingPage