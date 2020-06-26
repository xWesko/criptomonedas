import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Picker } from '@react-native-community/picker';
import axios from 'axios';


const Formulario = () => {

    const [moneda, guardarMoneda] = useState('');
    const [criptoMoneda, guardarCriptoMoneda] = useState('');
    const [criptoMonedas, guardarCriptoMonedas] = useState('');

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptoMonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    //Almacena las selecciones del usuario
    const obtenerMoneda = moneda =>{
        guardarMoneda(moneda)
    }
    const obtenerCriptoMoneda = cripto =>{
        guardarCriptoMoneda(cripto)
    }
    const cotizarPrecio = () => {
        console.log('cotizando...');
    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={ moneda => obtenerMoneda(moneda) }
                itemStyle={{height: 120}}
            >
                <Picker.Item label="- Seleccione -" value="" />
                <Picker.Item label="Dolar de Estados Unidos" value="USD" />
                <Picker.Item label="Peso Mexicano" value="MXN" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
            </Picker>

            <Text style={styles.label}>Cripto Moneda</Text>

            <Picker
                selectedValue={criptoMoneda}
                onValueChange={ cripto => obtenerCriptoMoneda(cripto) }
                itemStyle={{height: 120}}
            >
                <Picker.Item label="- Seleccione -" value="" />
                { criptoMonedas.map( (cripto) => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                 ) ) }
            </Picker>

            <TouchableHighlight 
                styles={styles.btnCotizar}
                onPress={  () => coti }
            >
                <Text styles={styles.textoCotizar}> Cotizar </Text>
            </TouchableHighlight>


        
        </View>


    );
}


const styles = StyleSheet.create({

    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20,
    },
    btnCotizar:{
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20
    },
    textoCotizar:{
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'
    }



});

export default Formulario;