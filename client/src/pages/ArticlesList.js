import React, { Component } from 'react';
import ReactTable from 'react-table-v6'
import api from '../api';
import styled from 'styled-components';

import 'react-table-v6/react-table.css';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

/**
 * Reuseable Component to Update Articles
 */
class UpdateArticle extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/articles/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

/**
 * Reuseable Component to Delete Articles
 */
class DeleteArticle extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the article ${this.props.title} permanently?`,
            )
        ) {
            api.deleteArticleById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class ArticlesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllArticles().then(articles => {
            this.setState({
                articles: articles.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { articles, isLoading } = this.state
        

        const columns = [
            {
                Header: 'Title',
                accessor: 'title',
                filterable: true,
            },
            {
                Header: 'Content',
                accessor: 'content',
                filterable: true,
            },
            {
                Header: 'Created on',
                accessor: 'createdAt',
                filterable: true,
            },
            {
                Header: 'Updated on',
                accessor: 'updatedAt',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteArticle id={props.original._id} title={props.original.title}/>
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateArticle id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!articles.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={articles}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default ArticlesList;