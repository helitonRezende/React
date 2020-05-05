import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name


  render() {
    return (
        <div>
            <h1>Estudo de Caso React - Heliton Rezende.</h1>
            <h2><p><span style={{ color: 'red' }}>FrameWorks Utilizados:</span></p></h2>
            <ul>
                <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
                <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
                <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
            </ul>
            <h4><p><span style={{ color: 'red' }}>Acesse o menu Caso de Uso e navegue no modelo de aplicao:</span></p></h4>
            <ul>
                <li><strong>Controler Aluno - </strong>Metodos de incluir, alterar, excluir e editar.</li>
                <li><strong>Controler Estado - </strong>Lista de estados do Brasil <code>somente para adaptar ComboBox dinamicos.</code></li>
                <li><strong>Esses Controles citados a cima - </strong>sao contrados pelos componentes Aluno e ALunoServico. <code> Aluno no Controle da UI e outro nas requicoes JSON acessando os Controles</code>.</li>
            </ul>
            <p>O Restante do <code>ClientApp</code> efetua o controle de Menu, Layout, Navegacao e CSS do caso de estudo.</p>
        </div>
    );
  }
}
