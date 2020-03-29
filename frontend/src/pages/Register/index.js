import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import InputMask from 'react-input-mask';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = { 
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try {
            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`);
             
            history.push('/');
        } catch (err) {
            alert('Falha ao tentar cadastrar uma ONG, tente novamente mais tarde')
        } 
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontratem os casos da sua ONG.</p>
               
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para o logon
                    </Link>

               </section>
                    <form onSubmit={handleRegister}>
                        <input 
                            placeholder="Nome da ONG"
                            value={name}
                            onChange={e => setName(e.target.value)} 
                            required
                        />

                        <input 
                            type="email" 
                            placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)} 
                            required
                        />

                        <InputMask mask="(99) 99999-9999" 
                            placeholder="Whatsapp"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)} 
                            required/>

                        <div className="input-group">
                          <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} 
                            required                        
                        />
                        
                        <input 
                            placeholder="UF" 
                            style={{ width: 80}} 
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            required
                        />
                        </div>
                        <button className="button" type="submit">Cadastar</button>
                    </form>
            </div>
        </div>
    );
}