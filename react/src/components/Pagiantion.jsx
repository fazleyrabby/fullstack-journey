import React from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client.js';


export default function Pagination({ links, callback }) {
    const getClassName = (active) => (active ? "btn btn-sm active" : "btn btn-sm")

    const handleCallback = (url) => {
        axiosClient.get(url)
            .then(({ data }) => {
                callback(data)
            })
    }

    return (
        links && (
            <div>
                <div style={{ display: "flex", gap: "5px" }}>
                    {links.links && links.links.map((link, key) => (
                        link.url ? (
                            <button key={key} className={getClassName(link.active)}
                                style={{ cursor: "pointer" }}
                                onClick={e => handleCallback(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}>
                            </button>) : (
                            <button key={key} className="btn btn-sm disabled"
                                dangerouslySetInnerHTML={{ __html: link.label }}>
                            </button>
                        )
                    ))
                    }
                </div>
            </div>
        )
    );
}