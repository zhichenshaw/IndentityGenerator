import Taro, { Component } from '@tarojs/taro';
import {
  View,
  Text,
  Button,
  Picker
} from '@tarojs/components';

import './index.less';

class Indentity extends Component {
  state = {
    identities: [], // 生成的身份照号列表
    years: [],
    year: null,
    month: []
  }

  componentDidShow = () => {
    this.batchGenerate();
    this.initData();
  }

  initData = () => {
    const now = new Date();
    let years = [];
    for (let i = 0; i < 100; i++) {
      years.push(now.getFullYear() - i);
    }

    this.setState({
      years: years.reverse(),
      year: now.getFullYear()
    })
  }

  getRandomDistrict = () => {
    return '420101';
  }

  getBirthDay = () => {
    return '19900307'
  }

  getSerialCode = () => {
    let serialCode = Math.floor(Math.random() * (999 - 1) + 1);
    return serialCode <= 99 ? '0' + serialCode : serialCode + '';
  }

  // 生成一个身份证号
  generateAnIdentity = () => {
    //     出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
    //  身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i            
    //  15位校验规则 6位地址编码+6位出生日期+3位顺序号
    //  18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位

    //  校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
    //                 公式(1)中： 
    //                 i----表示号码字符从由至左包括校验码在内的位置序号； 
    //                 ai----表示第i位置上的号码字符值； 
    //                 Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
    //                 i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    //                 Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

    const district = this.getRandomDistrict();
    const serialCode = this.getSerialCode();
    const birthday = this.getBirthDay();

    let id_string = '' + district + birthday + serialCode;
    const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
    let sum = 0;
    for (let i = 0; i < id_string.length; i++) {
      sum += Number(id_string[i]) * arrInt[i]
    }
    const validateNum = sum % 11;
    id_string += arrCh[validateNum];
    return id_string;
  }

  onChange = () => { }
  batchGenerate = () => {
    let ids = [];
    for (let i = 0; i < 10; i++) {
      const id = this.generateAnIdentity();
      ids.push(id);
    }

    this.setState({
      identities: ids
    })
  }

  render() {
    return (
      <View>
        <Text>Indentity</Text>
        <Button onClick={this.batchGenerate}>生成身份证号</Button>
        <View>
          <Text>生成的身份证号列表</Text>
          {
            this.state.identities.map((identity, index) => {
              return (
                <View key={index}>{identity}</View>
              )
            })
          }
        </View>

      </View>
    )
  }
}

export default Indentity;