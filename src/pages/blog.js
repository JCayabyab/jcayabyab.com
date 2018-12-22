import React, { Component } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import BlogPreview from "../components/BlogPreview";

import styled from "styled-components";

const Wrapper = styled.h1`
  display: flex;
  justify-content: center;
  margin: 0;
`;

const Header = styled.div`
  padding: 10px 10px;
  display: flex;
  justify-content: center;
  border-bottom: 7px solid #6d72c3;
`;

const HeaderTab = styled.a`
  cursor: pointer;
  opacity: ${props => (props.active ? "1" : "0.6")};

  transition: opacity 0.2s linear;

  &:hover {
    opacity: 1;
  }
`;

const Slash = styled.div`
  margin: 0 20px;
`;

class BlogPage extends Component {
  state = {
    selectedTab: "personal"
  };

  renderHeader() {
    return (
      <Wrapper>
        <Header>
          <HeaderTab
            onClick={() => this.updateTab("personal")}
            active={this.state.selectedTab === "personal"}
          >
            Personal
          </HeaderTab>
          <Slash>/</Slash>
          <HeaderTab
            onClick={() => this.updateTab("tech")}
            active={this.state.selectedTab === "tech"}
          >
            Tech
          </HeaderTab>
        </Header>
      </Wrapper>
    );
  }

  updateTab(tabName) {
    this.setState({ selectedTab: tabName });
  }

  renderPosts() {
    const { data } = this.props;

    const personalPosts = data.allMarkdownRemark.edges.filter(
      ({ node }) => node.frontmatter.type === "personal"
    );

    const techPosts = data.allMarkdownRemark.edges.filter(
      ({ node }) => node.frontmatter.type === "tech"
    );

    switch (this.state.selectedTab) {
      case "tech":
        return techPosts.map(({ node }) => (
          <BlogPreview key={node.id} post={{ ...node.frontmatter }} />
        ));
      case "personal":
        return personalPosts.map(({ node }) => (
          <BlogPreview key={node.id} post={{ ...node.frontmatter }} />
        ));
      default:
        console.log(this.state.selectedTab);
        return (
          <div>
            There are no posts under {this.state.selectedTab}! Check your switch
            statement or state updates.
          </div>
        );
    }
  }

  render() {
    return (
      <Layout>
        <SEO
          title="Blog"
          keywords={["blog", "personal", "journal", "jofred", "cayabyab"]}
        />
        {this.renderHeader()}
        {this.renderPosts()}
      </Layout>
    );
  }
}

export const query = graphql`
  query BlogIndexQuery {
    allMarkdownRemark(
      limit: 10
      sort: {fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            path
            subtitle
            date
            type
          }
        }
      }
    }
  }
`;

export default BlogPage;
