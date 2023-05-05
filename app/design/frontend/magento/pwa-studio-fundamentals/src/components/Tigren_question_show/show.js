import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_QUESTION_DATA = gql`
    query GetQuestionData($offset: Int!, $limit: Int!) {
        getQuestionData(offset: $offset, limit: $limit) {
            question_id
            customer_name
            title
            content
        }
    }
`;
const Show = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const { loading, error, data } = useQuery(GET_QUESTION_DATA, {
        variables: {
            offset: (currentPage - 1) * itemsPerPage,
            limit: itemsPerPage
        }
    });
    console.log(data);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const totalPages = Math.ceil(data.getQuestionData.length / itemsPerPage);
    const currentItems = data.getQuestionData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>QUESTION ID</th>
                        <th>CUSTOMER NAME</th>
                        <th>TITLE</th>
                        <th>CONTENT</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(
                        ({ question_id, customer_name, title, content }) => (
                            <tr key={question_id}>
                                <td>{question_id}</td>
                                <td>{customer_name}</td>
                                <td>{title}</td>
                                <td>{content}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    className="btn-pagination"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                >
                    Start
                </button>
                <button
                    className="btn-pagination"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    pre
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                        <button
                            className="btn-pagination"
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page ? 'active' : ''}
                        >
                            {page}
                        </button>
                    )
                )}
                <button
                    className="btn-pagination"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    next
                </button>
                <button
                    className="btn-pagination"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                >
                    End
                </button>
            </div>
            <Link to="/tigren_question/create">
                <button className="btn">Create Question</button>
            </Link>
        </div>
    );
};
export default Show;
