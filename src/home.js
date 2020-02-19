import React from "react";

class Home extends React.Component {
    render() {
        return (
            <div>
                <TopBanner />
            </div>
        );
    }
}

class TopBanner extends React.Component {
    render() {
        return (
            <div>
                <h1 class="title">Banner</h1>
            </div>
        );
    }
}

export default Home;