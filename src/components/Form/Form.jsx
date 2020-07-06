import React, { useState } from "react";
import styled from "styled-components";

const DetailInformation = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    background: maroon;
    padding: 20px;

    & p {
        color: white;
    }

    @media (max-width: 400px) {
        & div {
            width: 100%;
            margin: 10px 0;
        }
    }
`;

const Avatar = styled.div`
    & img {
        width: 200px;
        border-radius: 50%;
    }
`;

const Information = styled.div`
    & p:nth-child(1) {
        font-size: 20px;
        margin: 0;
    }
    & p:nth-child(2) {
        font-size: 22px;
        font-weight: bold;
        margin: 0;
    }
`;

const Input = styled.input`
    height: 30px;
    font-size: 15px;
    padding: 5px;
`;

export default function Form() {
    const [data, setData] = useState({ username: "", fetch: {} });
    const handleSubmit = (event) => {
        event.preventDefault();

        fetchData();
    };

    const handleChange = (event) => {
        setData({ ...data, username: event.target.value });
    };

    const fetchData = async () => {
        const url = `https://api.github.com/users/${data.username}`;
        const response = await fetch(url);
        const result = await response.json();
        setData({
            ...data,
            fetch: result,
        });
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div style={{ margin: "20px 0" }}>
                        <Input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            value={data.username}
                        />
                    </div>
                </form>
            </div>
            <div>
                {data.fetch.name === undefined ? null : (
                    <div>
                        <div>
                            <Avatar>
                                <img src={data.fetch.avatar_url} alt="avatar" />
                            </Avatar>
                            <div>
                                <h1>
                                    {data.fetch.name !== undefined &&
                                        data.fetch.name.toUpperCase()}
                                </h1>
                                <p>{data.fetch.bio}</p>
                            </div>
                        </div>
                        <hr />
                        <DetailInformation>
                            <Information>
                                <p>{data.fetch.followers}</p>
                                <p>Followers</p>
                            </Information>
                            <Information>
                                <p>{data.fetch.public_repos}</p>
                                <p>Repository</p>
                            </Information>
                            <Information>
                                <p>{data.fetch.following}</p>
                                <p>Following</p>
                            </Information>
                        </DetailInformation>
                    </div>
                )}
            </div>
        </div>
    );
}
