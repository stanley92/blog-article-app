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

class ArticlesUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            title: '',
            content: ''
        };
    }

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
     * Function to handle updates to article
     */
    handleUpdateArticle = async () => {
        const { id, title, content } = this.state;
        const payload = { title, content };

        await api.updateArticleById(id, payload).then(res => {
            window.alert(`Article ${title} is updated successfully`);
            this.setState({
                title: '',
                content: ''
            });
        });
    };

    componentDidMount = async () => {
        const { id } = this.state;
        const article = await api.getArticleById(id);

        this.setState({
            title: article.data.data.title,
            content: article.data.data.content
        });
    }

    render() {
        const { title, content } = this.state
        return (
            <Wrapper>
                <Title>Update Article</Title>

                <Label>Name: </Label>
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

                <Button onClick={this.handleUpdateArticle}>Update Article</Button>
                <CancelButton href={'/articles/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default ArticlesUpdate;