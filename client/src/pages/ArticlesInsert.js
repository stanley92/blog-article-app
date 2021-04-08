import React, { Component } from 'react';
import api from '../api';

import styled from 'styled-components';

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class ArticlesInsert extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: ''
        };
    };

    /**
     * Function to handle Change in Article Title
     * @param {*} event 
     */
    handleChangeInputTitle = async event => {
        const title = event.target.value
        this.setState({ title });
    };

    /**
     * Function to handle Change in Article Content
     * @param {*} event 
     */
    handleChangeInputContent = async event => {
        const content = event.target.value
        this.setState({ content });
    };
    
    /**
     * Function to handle Insertion of New Article using backend API
     */
    handleInsertArticle = async () => {
        const { title, content } = this.state
        const payload = { title, content }

        await api.insertArticle(payload).then(res => {
            window.alert(`Article ${title} is inserted successfully`);
            this.setState({
                title: '',
                content: ''
            });
        });
    };

    render() {
        const { title, content } = this.state;

        return (
            <Wrapper>
                <Title>Create Article</Title>

                <Label>Title: </Label>
                <InputText
                    type="text"
                    value={title}
                    onChange={this.handleChangeInputTitle}
                />

                <Label>Content: </Label>
                <InputText
                    type="text"
                    value={content}
                    onChange={this.handleChangeInputContent}
                />

                <Button onClick={this.handleInsertArticle}>Add Article</Button>
                <CancelButton href={'/articles/list'}>Cancel</CancelButton>
            </Wrapper>
        );
    }
}

export default ArticlesInsert;