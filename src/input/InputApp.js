import React from "react"
import { Component } from "react"
import { useContext } from "react";
import context from "../store/context";
import { func } from "prop-types";


export default function InputApp() {
    const { JCB, setJCB } = useContext(context);


    function showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `mt-2 alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#edit');
        container.insertBefore(div, form);
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }


    function deleteRow(button) {
        button.parentElement.parentElement.remove();
    }

    function checkEdits() {
        if (localStorage.table != null) {
            document.getElementById("edit").innerHTML = localStorage.table;
            console.log(localStorage.table)
        }
    }

    return (
        <div>
            <link rel="stylesheet" href="https://bootswatch.com/4/flatly/bootstrap.min.css"></link>
            <div className="container">
                <div className="mt-5 container d-flex justify-content-between align-items-cente">
                    <button id="button1" className="btn btn-warning" onClick={
                        () => {
                            const x = document.getElementById("edit");
                            const x2 = document.getElementById("button1");
                            if (x.contentEditable == "true") {
                                x.contentEditable = "false";
                                localStorage.table = x.innerHTML;
                                x2.innerHTML = "修改作业内容";
                            } else {
                                x.contentEditable = "true";
                                x2.innerHTML = "保存作业内容";
                            }
                        }
                    }>修改作业内容</button>
                    <button className="btn btn-info" onClick={
                        () => {
                            const list = document.getElementById("rows");
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                `;
                            list.appendChild(row);
                        }
                    }>新增作业</button>
                </div>
                <div className="container mt-4" id="edit">
                    <div className="display-4 text-center">
                        <h1 id="edit">作业列表</h1>
                    </div>
                    <table className="table table-striped mt-5">
                        <thead className="table-primary">
                            <tr>
                                <th>name</th>
                                <th>arrivialTime</th>
                                <th>serviceTime</th>
                                <th>memory</th>
                                <th>tapeDriver</th>
                            </tr>
                        </thead>
                        <tbody id="rows"></tbody>
                    </table>
                </div>
                <button className="btn btn-info" onClick={
                    () => {
                        setJCB([])
                    }
                }>提交作业</button>
            </div>
        </div>
    )
}

