import React, { Component } from 'react';

export default class AlunoServico extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lstAlunos: [],
            loading: true
        };

        this.getALLAluno();

    }

    // Metodo Add ou Update Aluno //
    addAluno = async () => {
        this.setState({ loading: true });

        const { Atributos } = this.props;

        await fetch('api/Aluno', {
            method: Atributos.id > 0 ? 'Put' : 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Id: Atributos.id,
                Nome: Atributos.nome,
                IdEstado: Atributos.idEstado,
                Sexo: Atributos.selOption,
                Carro: Atributos.selCheckC,
                Casa: Atributos.selCheckS
            })
        })
        .then(response => {
            if (response.ok) {
                this.getALLAluno();
            } else {
                console.log(response.text());
            }
        });
    }

    // Metodo Deleta Aluno //
    delAluno = async () => {
        this.setState({ loading: true });

        const { Atributos } = this.props;

        await fetch('api/Aluno/' + Atributos.id, {
            method: 'Delete'
        })
        .then(response => {
            if (response.ok) {
                this.getALLAluno();
            } else {
                console.log(response.text())
            }
        });
    }

    // Metodo Lista um Aluno //
    getAluno = async (id) => {
        this.setState({ loading: true })

        await fetch('api/Aluno/' + id, {
            method: 'Get'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log(response.text());
            }
        })
        .then(data => {
            const { MetodoSetRegistro } = this.props;
            MetodoSetRegistro(data);
            this.setState({ loading: false });
        });
    }

    // Metodo Lista todos Alunos //
    getALLAluno = async () => {
        await fetch('api/Aluno', {
            method: 'Get'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log(response.text());
            }
        })
        .then(data => { this.setState({ lstAlunos: data, loading: false })});

        const { MetodoInicializaRegistro } = this.props;
        MetodoInicializaRegistro();
    }

    render() {

        const { Atributos } = this.props;

        return (
            <div>

                {/* Loading Padrao */}
                {this.state.loading ? <div className="modal-backdrop in"><div className="loader"></div></div> : null}

                <div>
                    {/* Botao da Acao */}
                    <div>
                        {Atributos.validForm === false ?
                            <button className="btn btn-primary" type='button' disabled>Salvar</button>
                            : <button className="btn btn-primary" type='button' onClick={this.addAluno}>Salvar</button>}

                        {Atributos.id <= 0 ?
                            <button className="btn btn-primary" type='button' disabled>Excluir</button>
                            : <button className="btn btn-primary" type='button' onClick={this.delAluno}>Excluir</button>}
                    </div>
                    {/* Lista Alunos */}
                    <div>
                        <table className="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.lstAlunos.map(aluno =>
                                    <tr key={aluno.id}>
                                        <td>{aluno.id}</td>
                                        <td>{aluno.nome}</td>
                                        <td><button className="btn btn-primary" type='button' onClick={(e) => this.getAluno(aluno.id)}>Editar</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>                        
            </div>
        );
    }
}