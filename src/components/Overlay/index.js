import React from "react";
import { Grid, Button, Modal, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactFullpage from "@fullpage/react-fullpage";
import "./index.css";

const Overlay = () => (
  <ReactFullpage
    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <div className="section section-1">
            <Button
              inverted
              circular
              basic
              color="grey"
              className="auth-button"
              as={Link}
              to="/admin"
            >
              <span className="auth-text">Авторизация</span>
            </Button>
            <Grid container>
              <Grid.Row centered>
                <Grid.Column width={12}>
                  <h1 className="logo">Dorm</h1>
                </Grid.Column>
                <Grid.Column stretched mobile="16" computer={15}>
                  <p className="description">
                    Dorm позволяет создавать и обрабатывать заявления, для
                    заселения студентов в общежития
                  </p>
                </Grid.Column>
                <Grid.Column width={12}>
                  <div className="buttons">
                    <Button
                      className="req-button"
                      as={Link}
                      to="/form"
                      circular
                    >
                      <span className="req-text"> Подать заявление </span>
                    </Button>
                    <Modal
                      trigger={
                        <Button className="req-button" circular icon="info" />
                      }
                      closeIcon
                    >
                      <Header icon="info" content="Информация" />
                      <Modal.Content scrolling>
                        <p>
                          При обращении к услугодателю:
                          <br /> 1) заявление о предоставлении места в общежитии
                          по форме согласно приложению 2 к настоящему стандарту
                          государственной услуги;
                          <br /> 2) копия свидетельства о смерти обоих или
                          единственного родителя либо справка с детского дома
                          (при наличии); <br /> 3) копия удостоверения оралмана
                          (при наличии);
                          <br /> 4) справку о наличии в семье 4-х и более детей
                          (для многодетных семей); <br /> 5) справка об
                          инвалидности (при наличии); <br /> 6) копия документа,
                          удостоверяющего личность; <br /> <br /> При обращении
                          к услугодателю: <br /> 1) заявление о предоставлении
                          места в общежитии по форме согласно приложению 2 к
                          настоящему стандарту государственной услуги; <br /> 2)
                          копия свидетельства о смерти обоих или единственного
                          родителя либо справка с детского дома (при наличии);
                          <br /> 3) копия удостоверения оралмана (при наличии);
                          <br /> 4) справку о наличии в семье 4-х и более детей
                          (для многодетных семей);
                          <br /> 5) справка об инвалидности (при наличии);
                          <br /> 6) копия документа, удостоверяющего личность;
                          <br />
                          <br />
                          При обращении к услугодателю: <br /> 1) заявление о
                          предоставлении места в общежитии по форме согласно
                          приложению 2 к настоящему стандарту государственной
                          услуги; <br /> 2) копия свидетельства о смерти обоих
                          или единственного родителя либо справка с детского
                          дома (при наличии); <br />
                          3) копия удостоверения оралмана (при наличии); <br />
                          4) справку о наличии в семье 4-х и более детей (для
                          многодетных семей); <br /> 5) справка об инвалидности
                          (при наличии); <br /> 6) копия документа,
                          удостоверяющего личность;
                        </p>
                      </Modal.Content>
                    </Modal>
                  </div>
                </Grid.Column>
                <Grid.Column width={12}>
                  <div
                    onClick={() => fullpageApi.moveSectionDown()}
                    className="icon-scroll"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default Overlay;
