import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import ServicoAluno from './AlunoServico';

export class Aluno extends Component {

    // Construtor //
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            nome: '',
            lstEstado: [],
            idEstado: 0,
            selEstado: '',
            selOption: 'M',
            selCheckC: true,
            selCheckS: true,
            loading: true,
            validForm: false,
            errors: {
                name: 'Campo deve ser informado, verifique!'
            },
        };

        this.getALLEstado();

        this.handleChange.bind(this);
        this.handleSelect.bind(this);
        this.handleOption.bind(this);
        this.handleCheck.bind(this);
    }

    // Metodo Lista todos Estados //
    getALLEstado = async () => {
        await fetch('api/Estado/ListaEstado')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log(response.text());
            }
        })
        .then(data => { this.setState({ lstEstado: data, idEstado: 1, selEstado: "Acre", loading: false })});
    }

    // Metodo Inicializa Campos //
    InicializaRegistro = () => {
        this.setState({ id: 0 });
        this.setState({ nome: '' });
        this.setState({ selOption: 'M' });
        this.setState({ selCheckC: false });
        this.setState({ selCheckS: false });

        this.SetObrigatorioTela('');
    }

    // Metodo Set Campos Edicao //
    SetRegistro = (edicao) => {
        this.setState({ id: edicao.id });
        this.setState({ nome: edicao.nome });
        this.setState({ idEstado: edicao.idEstado });
        this.setState({ selEstado: edicao.estado.nmEstado });
        this.setState({ selOption: edicao.sexo });
        this.setState({ selCheckC: edicao.carro });
        this.setState({ selCheckS: edicao.casa });

        this.SetObrigatorioTela(edicao.nome);
    }

    // Metodo Set Atributo obrigatorio //
    SetObrigatorioTela = (edicao) => {
        this.setState({ validForm: true });
        let errors = this.state.errors;
        errors.name = edicao.length <= 0
                    ? 'Campo deve ser informado, verifique!'
                    : '';
        this.setState({ errors });
        Object.values(errors).forEach(val => val.length > 0 && (this.setState({ validForm: false })));
    }

    // Evento Estado - Dropdown //
    handleSelect(eventKey) {
        this.setState({ idEstado: eventKey, selEstado: this.state.lstEstado[eventKey - 1].nmEstado });
    }

    // Evento Sexo - Radio //
    handleOption = (event) => {
        const { value } = event.target;
        this.setState({ selOption: value });
    }

    // Evento Carro e Casa - CheckBox //
    handleCheck = (event) => {
        const { checked, name } = event.target;
        switch (name) {
            case 'carro':
                this.setState({ selCheckC: checked ? true : false });
                break;
            case 'casa':
                this.setState({ selCheckS: checked ? true : false });
                break;
            default:
                break;
        }
    }

    // Evento Nome - Text e Hidden //
    handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'nome':
                this.SetObrigatorioTela(value);
                break;
            default:
                break;
        }

        this.setState({ [name]: value });
    }

    render() {

        return (
            <div>

                {/* Loading Padrao */}
                {this.state.loading ? <div className="modal-backdrop in"><div className="loader"></div></div> : null}

                {/* Atributo hidden */}
                <div className='form-group'>
                    <input type="hidden" title="Id" className="form-control" name="id" value={this.state.id} onChange={this.handleChange} />
                </div>

                {/* Atributo Text */}
                <div className='form-group'>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" title="Nome" className="form-control" name="nome" value={this.state.nome} onChange={this.handleChange} noValidate />
                    {this.state.errors.name.length > 0 &&
                        <span className='error' style={{ color: 'red' }}>{this.state.errors.name}</span>}
                </div>

                {/* Atributo Dropdown */}
                <div className="panel-group">
                    <h2>Origem</h2>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <DropdownButton title={this.state.selEstado} className="form-control btn btn-secondary" id="document-type"
                                onSelect={this.handleSelect.bind(this)}>
                                {this.state.lstEstado.map((item) => (
                                    <MenuItem key={item.id} eventKey={item.id}>
                                        {item.nmEstado}
                                    </MenuItem>
                                ))}
                            </DropdownButton>
                        </div>
                    </div>
                </div>

                {/* Atributo Radio */}
                <div className="panel-group">
                    <h2>Sexo</h2>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="form-check-inline">
                                <label htmlFor="Sexo">Masculino</label>
                                <input type="radio" title="Masculino" className="form-check-input" name="sexo" value="M" checked={this.state.selOption === 'M'} onChange={this.handleOption} />

                                <label htmlFor="Sexo">Femenino</label>
                                <input type="radio" title="Femenino" className="form-check-input" name="sexo" value="F" checked={this.state.selOption === 'F'} onChange={this.handleOption} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Atributo CheckBox */}
                <div className="panel-group">
                    <h2>Bens</h2>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="form-check-inline">
                                <label htmlFor="Carro">Carro</label>
                                <input type="checkbox" title="Carro" name="carro" className="form-check-input" checked={this.state.selCheckC} onChange={this.handleCheck} />

                                <label htmlFor="Casa">Casa</label>
                                <input type="checkbox" title="Casa" name="casa" className="form-check" checked={this.state.selCheckS} onChange={this.handleCheck} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Servico Aluno - Componente */}
                <ServicoAluno
                    Atributos={this.state}
                    MetodoInicializaRegistro={this.InicializaRegistro.bind(this)}
                    MetodoSetRegistro={this.SetRegistro.bind(this)}
                />                
 
            </div>
        );
    }
}