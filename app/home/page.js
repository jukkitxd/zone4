'use client';
import React, { useState, useEffect } from 'react';
import { Radio, Input, Button, Layout, Menu,theme } from 'antd';
import { Col, Row } from 'antd';
import './ZenToBath.css';
const { Header, Content, Footer, Sider } = Layout;

const ZenToBath = () => {
  const [zen, setZen] = useState(0);
  const [zenShow, setZenShow] = useState(0);
  const [bath, setBath] = useState(0);
  const [result, setResult] = useState(0);
  const vat = [0, 1, 5, 7, 10];
  const [vatValue, setVatValue] = useState(0);
  const [bathPerZen, setBathPerZen] = useState(0);
  const [stateDisplay, setStateDisplay] = useState('zen');

  useEffect(() => {
    if (stateDisplay === 'zen') {
      // Calculate the result whenever zen, bath, or vatValue changes
      const BpZ = (zen - (zen * vatValue / 100)) / 1000000;
      const zenToBath = BpZ * bath;

      if (zenToBath < 1) {
        setResult(0);
      } else {
        setResult(zenToBath.toFixed(2));
      }
    } else {
      const ZpB = (bath / bathPerZen) * 1000000 - ((bath / bathPerZen) * 1000000 * vatValue / 100);

      if (ZpB < 1) {
        setZenShow(0);
      } else {
        setZenShow(formatNumber(ZpB.toFixed(0)));
      }
    }
  }, [zen, bath, vatValue, stateDisplay, bathPerZen]);

  const getZenInputColorClass = () => {
    let zenNoCommas = zen;

    if (zenNoCommas >= 100000000) {
      return 'orange-text';
    } else if (zenNoCommas >= 10000000) {
      return 'pink-text';
    } else if (zenNoCommas >= 1000000) {
      return 'blue-text';
    } else if (zenNoCommas >= 100000) {
      return 'yellow-text';
    }
    return ''; // Default class
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleZenInputChange = (e) => {
    const inputText = e.target.value.replace(/,/g, ''); // Remove existing commas
    setZenShow(formatNumber(inputText)); // Add commas back in
    setZen(inputText);
  };

  const convertBathToZen = () => {
    // Reset all values
    setZen(0);
    setZenShow(0);
    setBath(0);
    setResult(0);
    setVatValue(0);
    setBathPerZen(0);

    const convertBtn = document.getElementsByName('convert')[0];
    if (stateDisplay === 'zen') {
      setStateDisplay('bath');
      convertBtn.innerHTML = 'Zen to Bath';
    } else {
      setStateDisplay('zen');
      convertBtn.innerHTML = 'Bath to Zen';
    }
  };

  const onChangeVat = (e) => {
    setVatValue(e.target.value);
  };

  const displayShow = () => {
    if (stateDisplay === 'zen') {
      return zenToBath();
    } else {
      return bathToZen();
    }
  };

  const zenToBath = () => {
    return (
      <Row>
        <Col span={24}>
        <h1>แปลง Zen เป็น เงินบาท</h1>
        </Col>
        <Col span={24}>
            <Col span={6}>
                <h2>Zen</h2>
                <Input
                    type="text"
                    value={zenShow}
                    onChange={handleZenInputChange}
                    className={`custom-input ${getZenInputColorClass()}`}
                />
            </Col>
        </Col>
        <Col span={24}>
            <Col span={6}>
            <h2>ราคาเงิน M</h2>
            <Input
            type="number"
            value={bath}
            onChange={(e) => setBath(e.target.value)}
            />
            </Col>
        </Col>
        <Col span={24}>
            <Col span={6}>
            <h2>ภาษี</h2>
            <Radio.Group options={vat} onChange={onChangeVat} value={vatValue} optionType="button" buttonStyle="solid" /> <span>%</span>
            </Col>
        </Col>
        <h2>แปลงได้: <span className="custom-input">{result || '0'}</span> บาท</h2>
     </Row>
    );
  };

  const setZenInputColorClass = () => {
    let zenShowNoCommas = zenShow.toString().replace(/,/g, ''); // Remove existing commas
    console.log(zenShowNoCommas);
    if (zenShowNoCommas >= 100000000) {
      return 'orange-text';
    } else if (zenShowNoCommas >= 10000000) {
      return 'pink-text';
    } else if (zenShowNoCommas >= 1000000) {
      return 'blue-text';
    } else if (zenShowNoCommas >= 100000) {
      return 'yellow-text';
    }
    return ''; // Default class
  };

  const bathToZen = () => {
    return (
        <Row>
            <Col span={24}>
                <h1>แปลง เงินบาท เป็น Zen</h1>
            </Col>
            <Col span={24}>
                <Col span={6}>
                    <h2>จำนวนเงิน (บาท)</h2>
                        <Input
                        type="number"
                        value={bath}
                        onChange={(e) => setBath(e.target.value)}
                        />
                </Col>
            </Col>
            <Col span={24}>
                <Col span={6}>
                    <h2>เรทราคาเงิน M</h2>
                    <Input
                    type="number"
                    value={bathPerZen}
                    onChange={(e) => setBathPerZen(e.target.value)}
                    />
                </Col>
            </Col>
            <Col span={24}>
                <Col span={6}>
                    <h2>ภาษี</h2>
                    <Radio.Group options={vat} onChange={onChangeVat} value={vatValue} optionType="button" buttonStyle="solid" /> <span>%</span>
                </Col>
            </Col>
        <h2>จำนวน Zen ที่แลกได้: <span className={`custom-input ${setZenInputColorClass()}`}>{zenShow || '0'}</span> Zen</h2>
      </Row>
    );

  };


const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
          <Menu.Item key="1">
            <a href="/home">Home</a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="https://discord.gg/GRxu5wd76A">Bug Report</a>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
            }}
          >
             {displayShow()}
             <Button type="primary" name="convert" onClick={convertBathToZen}>Bath to Zen</Button>
             {
              // indicates very long content
              Array.from(
                {
                  length: 100,
                },
                
              )
            }
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
         Powered by Zone4Fandom
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ZenToBath;