import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import "./DataRenderer.css"

export const DataRenderer = ({ data = [] }) => {
    const columns = [
        "Project ID",
        "Employee ID #1",
        "Employee ID #2",
        "Days Worked Together",
    ];

    return (
        <Container variant='info'>
            <Row className='dataRenderer_row'>
                {columns.map((col, idx) => (
                    <Col className='dataRenderer_col' key={`${idx}-col`}>{col}</Col>
                ))}
            </Row>
            <Row className='dataRenderer_row'>
                {data.map((item, idx) => {
                    return (<>
                        <Col key={`${idx}-${item.projectID}`} className='dataRenderer_col'>{item.projectID}</Col>
                        <Col key={`${idx}-${item.employee1}`} className='dataRenderer_col'>{item.employee1}</Col>
                        <Col key={`${idx}-${item.employee2}`} className='dataRenderer_col'>{item.employee2}</Col>
                        <Col key={`${idx}-${item.totalDays}`} className='dataRenderer_col'>{item.totalDays}</Col>
                    </>)
                })}
            </Row>
        </Container>
    );
}