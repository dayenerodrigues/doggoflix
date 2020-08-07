/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const [categorias, setCategorias] = useState([]);
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '#000000',
  };
  const [values, setValues] = useState(valoresIniciais);

  function setValue(fieldName, value) {
    setValues({
      ...values,
      [fieldName]: value,
    });
  }

  function handleChange(event) {
    setValue(event.target.getAttribute('name'), event.target.value);
  }

  useEffect(
    () => {
      const URL_CATEGORIAS = 'http://localhost:8080/categorias/';
      fetch(URL_CATEGORIAS)
        .then(async (respostaServidor) => {
          const resposta = await respostaServidor.json();
          setCategorias([
            ...resposta,
          ]);
        });
    },
  );

  return (
    <PageDefault>
      <h1>Cadastro de Categoria</h1>

      <form onSubmit={(event) => {
        event.preventDefault();
        setCategorias([
          ...categorias,
          values,
        ]);
        setValues(valoresIniciais);
      }}
      >
        <FormField
          label="Nome da Categoria"
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      <ul>
        {
          categorias.map((categoria) => <li key={categoria.nome}>{categoria.nome}</li>)
        }
      </ul>

    </PageDefault>
  );
}

export default CadastroCategoria;
