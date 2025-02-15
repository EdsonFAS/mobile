import React, { useState } from 'react';
import { View, Text, TextInput,TouchableOpacity, StyleSheet } from 'react-native';

export default function BuscarCep() {
// Estados para armazenar o valor do CEP e os dados retornados
const [cep, setCep] = useState('');
const [dadosCep, setDadosCep] = useState(null);
const [erro, setErro] = useState(null);

// Função para buscar os dados do CEP
const buscarCep = async () => {
  try {
    // Limpar qualquer erro anterior
    setErro(null);
    
    // Fazer a requisição para a API ViaCEP
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    
    // Verificar se a resposta contém erro
    if (data.erro) {
      setErro('CEP não encontrado');
      setDadosCep(null);
    } else {
      setDadosCep(data);
    }
  } catch (err) {
    setErro('Erro ao buscar dados');
    setDadosCep(null);
  }
};

return (
  <View style={styles.container}>
    <Text style={styles.title}>Realizer Busca de Cep</Text>
    
    {/* Campo para digitar o CEP */}
    <TextInput
      style={styles.input}
      placeholder="Insira o CEP"
      value={cep}
      onChangeText={setCep}
      keyboardType="numeric"
    />

    {/* Botão de busca */}
    <TouchableOpacity style={styles.Button} onPress={buscarCep}>
        <Text style={styles.buttonText}>Clique Aqui</Text>
      </TouchableOpacity>
  

    {/* Exibir erro ou dados do CEP */}
    {erro && <Text style={styles.error}>{erro}</Text>}
    
    {dadosCep && !erro && (
      <View style={styles.resultContainer}>
        <Text ><Text style={{fontWeight:'800'}}>CEP:</Text>{dadosCep.cep}</Text>
        <Text><Text style={{fontWeight:'800'}}>Logradouro:</Text> {dadosCep.logradouro}</Text>
        <Text><Text style={{fontWeight:'800'}}>Bairro:</Text> {dadosCep.bairro}</Text>
        <Text><Text style={{fontWeight:'800'}}>Cidade:</Text> {dadosCep.localidade}</Text>
        <Text><Text style={{fontWeight:'800'}}>Estado:</Text> {dadosCep.uf}</Text>
      </View>
    )}
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 8,
},
title: {
  fontSize: 24,
  marginBottom: 46,
},
input: {
  width: '100%',
  height: 40,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 4,
  paddingHorizontal: 8,
  marginBottom: 16,
},
error: {
  color: 'red',
  marginBottom: 16,
},
resultContainer: {
  backgroundColor:'white',
  marginTop: 16,
  padding: 10,
  borderWidth: 4,
  borderColor: 'green',
  borderRadius: 2,
  width: '100%',
  elevation: 8,  // Aumente o valor para uma sombra mais forte
  // Sombra para iOS
  shadowColor: 'black',  // Cor da sombra
  shadowOffset: { width: 0, height: 6 },  // Distância da sombra
  shadowOpacity: 0.3,  // Transparência da sombra
  shadowRadius: 5,
 
},
Button:{
  width: '100%',  // Definindo a largura do botão
  padding: 10,
  backgroundColor: '#898989',
  borderRadius: 12,
  alignItems: 'center', 

},
buttonText:{
  color:'white'
}
});
