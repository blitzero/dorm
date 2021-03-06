import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Icon,
  Input,
  Message,
  Segment
} from "semantic-ui-react";
import { findName } from "../../utils/util";
import WithForm from "../hoc/withForm";
import Dorms from "../Dorms";
import FirstDorm from "../Dorms/FirstDorm/";
import { FormStyle } from "./style";

const FormComponent = props => {
  const [currentDorm, setCurrentDorm] = useState(null);

  /**
   * This is for setting the min date that student can reserve a room
   */
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let currDate = `${year}-0${month}-${day}`;

  function handleShelterChange(e) {
    const { value } = e.target;
    const [shelter, parentType, name] = e.target.name.split(".");
    props.handleParentsChange(state => ({
      ...state,
      [shelter]: {
        ...state[shelter],
        [parentType]: {
          ...state[shelter][parentType],
          [name]: value
        }
      }
    }));
  }

  function handleNestedObjChange(e) {
    const { value } = e.target;
    const [type, name] = e.target.name.split(".");
    props.handleParentsChange(state => ({
      ...state,
      [type]: {
        ...state[type],
        [name]: value
      }
    }));
  }

  return <FormStyle>
      <Grid.Row centered>
        <Grid.Column width="14">
          <Segment>
            {currentDorm !== null ? (
              <FirstDorm
                dormDb={props.state.dormDb}
                setCurrentDorm={setCurrentDorm}
                currentDorm={currentDorm}
                setSelectedRoom={props.handleParentsChange}
              />
            ) : (
              <Dorms
                dormDb={props.state.dormDb}
                setCurrentDorm={setCurrentDorm}
                currentDorm={currentDorm}
                setSelectedRoom={props.handleShelterChange}
              />
            )}
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Segment>
        <Form success={props.state.responseStatus === 200 || props.state.responseStatus === 201} error={!!props.state.error} loading={props.state.loading} onSubmit={props.handleSubmit} className="mainForm" size="large" unstackable>
          <Grid relaxed="very" columns="3">
            <Grid.Row verticalAlign="top" centered>
              <Grid.Column stretched width="7">
                <label className="form-label">ФИО</label>
                <Form.Group>
                  <Form.Field width="7" required>
                    <Input required type="text" name="name_l" pattern="[А-ЯЁ][а-яё]{1,39}$" onChange={props.handleChange} value={props.state.name_l} label={{ icon: "asterisk", color: "black" }} labelPosition="right corner" placeholder="Фамилия" />
                  </Form.Field>
                  <Form.Field width="7" required>
                    <Input required type="text" name="name_f" pattern="[А-ЯЁ][а-яё]{1,39}$" onChange={props.handleChange} value={props.state.name_f} label={{ icon: "asterisk", color: "black" }} labelPosition="right corner" placeholder="Имя" />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width="14">
                    <Input required type="text" name="patronymic" pattern="[А-ЯЁ][а-яё]{1,39}$" onChange={props.handleChange} value={props.state.patronymic} label={{ icon: "asterisk", color: "black" }} labelPosition="right corner" placeholder="Отчество" />
                  </Form.Field>
                </Form.Group>

                <label className="form-label">Личные данные</label>

                <Form.Group>
                  <Form.Field width="14" name="residence_permit.country_id" onChange={handleNestedObjChange} value={props.state.residence_permit.country_id} control="select" required>
                    <option value="" disabled>
                      Выберите страну
                    </option>
                    {props.state.dormDb.countries.map((country, index) => {
                      return <React.Fragment key={index}>
                          <option value={country.id}>{country.name}</option>
                        </React.Fragment>;
                    })}
                  </Form.Field>
                </Form.Group>

                <Form.Group>
                  <Form.Field width="4" required>
                    <Input required type="text" name="residence_permit.city" onChange={handleNestedObjChange} value={props.state.residence_permit.city} placeholder="Город" />
                  </Form.Field>
                  <Form.Field width="10" required>
                    <Input required type="text" name="residence_permit.address" onChange={handleNestedObjChange} value={props.state.residence_permit.address} placeholder="Адрес проживания" />
                  </Form.Field>
                </Form.Group>

                <Form.Group>
                  {props.state.residence_permit.country_id === "71" ? <Form.Field width="14" required>
                      <Input required type="text" name="citizenship.number" maxLength="12" onChange={handleNestedObjChange} value={props.state.citizenship.number} placeholder="ИИН" />
                    </Form.Field> : <Form.Field width="14" required>
                      <Input required type="text" name="citizenship.number" maxLength="10" onChange={handleNestedObjChange} value={props.state.citizenship.number} placeholder="Номер паспорта" />
                    </Form.Field>}
                </Form.Group>

                <Form.Group>
                  <Form.Field width="7" required>
                    <Input required type="text" name="children" onChange={props.handleChange} value={props.state.children} placeholder="Кол-во детей в семье" />
                  </Form.Field>
                  <Form.Field width="7" className="gender" name="gender_id" onChange={props.handleSelect} value={props.state.gender_id} control="select" required>
                    <option value="" disabled>
                      Выберите пол
                    </option>
                    <option value="1">Мужской</option>
                    <option value="2">Женский</option>
                  </Form.Field>
                </Form.Group>

                <label className="form-label">Контакты</label>

                <Form.Group>
                  <Form.Field width="14" required>
                    <Input type="text" name="phone" maxLength="11" onChange={props.handleChange} pattern="((\+7)|[8])7[0-9]{9}$" value={props.state.phone} icon="phone" label={{ content: "Телефон", color: "black" }} labelPosition="left" placeholder="Начиная с 8" />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width="14" required>
                    <Input type="email" name="email" onChange={props.handleChange} value={props.state.email} icon="mail" label={{ content: "E-mail", color: "black" }} labelPosition="left" placeholder="test@test.kz" />
                  </Form.Field>
                </Form.Group>

                <label className="form-label">Другое</label>

                <Form.Group>
                  <Form.Field width="7" required>
                    <Input type="text" name="group" onChange={props.handleChange} value={props.state.group} icon="group" label={{ content: "Группа", color: "black" }} labelPosition="left" placeholder="ВТ-13С" />
                  </Form.Field>
                  <Form.Field width="7" required>
                    <Input type="date" min={currDate} name="date_residence" onChange={props.handleChange} value={props.state.date_residence} icon="calendar" label={{ content: "Дата", color: "black" }} labelPosition="left" placeholder="test@test.kz" />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width="14" name="educational_form_id" onChange={props.handleSelect} value={props.state.educational_form_id} control="select" required>
                    <option value="">Выберите форму обучения</option>
                    {props.state.dormDb.educational_form && props.state.dormDb.educational_form.map(
                        (eduForm, index) => {
                          const name = findName(
                            props.state.dormDb.names,
                            eduForm.name_id
                          );
                          return (
                            <React.Fragment key={index}>
                              <option value={eduForm.id}>
                                {name.name_ru}
                              </option>
                            </React.Fragment>
                          );
                        }
                      )}
                  </Form.Field>
                </Form.Group>
                <Form.Group className="lastGroup">
                  <Form.Field required>
                    <input readOnly required value={props.state.room_id} type="number" name="room_id" onChange={props.handleChange} placeholder="Введите номер комнаты" />
                  </Form.Field>
                  <Form.Field required>
                    <input readOnly required value={props.state.dorm_id || ""} type="number" name="dorm_id" onChange={props.handleChange} placeholder="Номер общежития" />
                  </Form.Field>
                </Form.Group>
              </Grid.Column>

              {/* second column */}

              <Grid.Column className="parentsCol" width="7">
                <label htmlFor="parents" className="form-label">
                  Родители
                </label>
                <Form.Group className="parents">
                  <Form.Field id="parents" width="16" name="parents" onChange={props.handleChange} value={props.state.parents} control="select">
                    <option value="">Нет</option>
                    <option value="both">Оба родителя</option>
                    <option value="mother">Мама</option>
                    <option value="father">Папа</option>
                    <option value="guardian">Опекун</option>
                    <option value="orphanage">Детский дом</option>
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  {(props.state.parents === "mother" || props.state.parents === "both") && <React.Fragment>
                      <Form.Field>
                        <label htmlFor="parent_mother.name_l">Фамилия</label>
                        <input aria-label="Фамилия" aria-required={true} id="parent_mother.name_l" name="shelter.parent_mother.name_l" value={props.state.shelter.parent_mother.name_l || ""} onChange={handleShelterChange} placeholder="Фамилия матери" type="text" />
                      </Form.Field>
                      <Form.Field>
                        <label htmlFor="parent_mother.name_f">Имя</label>
                        <input aria-label="Имя" aria-required={true} id="parent_mother.name_f" name="shelter.parent_mother.name_f" value={props.state.shelter.parent_mother.name_f || ""} onChange={handleShelterChange} placeholder="Имя матери" type="text" />
                      </Form.Field>
                      <Form.Field>
                        <label htmlFor="parent_mother.patronymic">
                          Отчество
                        </label>
                        <input aria-label="Отчество" aria-required={true} id="parent_mother.patronymic" name="shelter.parent_mother.patronymic" value={props.state.shelter.parent_mother.patronymic || ""} onChange={handleShelterChange} placeholder="Отчество матери" type="text" />
                      </Form.Field>
                      <Form.Field>
                        <label htmlFor="parent_mother.phone">
                          Номер телефона
                        </label>
                        <input aria-label="Номер телефона" aria-required={true} id="parent_mother.phone" name="shelter.parent_mother.phone" value={props.state.shelter.parent_mother.phone || ""} onChange={handleShelterChange} placeholder="Номер телефона матери" type="text" />
                      </Form.Field>
                    </React.Fragment>}
                </Form.Group>
                <Form.Group>
                  {(props.state.parents === "father" || props.state.parents === "both") && <React.Fragment>
                      <Form.Field>
                        <label htmlFor="parent_father.name_l">Фамилия</label>
                        <input aria-label="Фамилия" aria-required={true} id="parent_father.name_l" name="shelter.parent_father.name_l" value={props.state.shelter.parent_father.name_l || ""} onChange={handleShelterChange} placeholder="Фамилия отца" type="text" />
                      </Form.Field>
                      <Form.Field>
                        <label htmlFor="parent_father.name_f">Имя</label>
                        <input aria-label="Имя" aria-required={true} id="parent_father.name_f" name="shelter.parent_father.name_f" value={props.state.shelter.parent_father.name_f || ""} onChange={handleShelterChange} placeholder="Имя отца" type="text" />
                      </Form.Field>
                      <Form.Field>
                        <label htmlFor="parent_father.patronymic">
                          Отчество
                        </label>
                        <input aria-label="Отчество" aria-required={true} id="parent_father.patronymic" name="shelter.parent_father.patronymic" value={props.state.shelter.parent_father.patronymic || ""} onChange={handleShelterChange} placeholder="Отчество отца" type="text" />
                      </Form.Field>
                      <Form.Field>
                        <label htmlFor="parent_father.phone">
                          Номер телефона
                        </label>
                        <input aria-label="Номер телефона" aria-required={true} id="parent_father.phone" name="shelter.parent_father.phone" value={props.state.shelter.parent_father.phone || ""} onChange={handleShelterChange} placeholder="Номер телефона отца" type="text" />
                      </Form.Field>
                    </React.Fragment>}
                  {props.state.parents === "orphanage" && <React.Fragment>
                      <Form.Field>
                        <label htmlFor="orphanage.address">Адресс</label>
                        <input aria-label="Адрес" aria-required={true} id="orphanage.address" name="shelter.orphanage.address" value={props.state.shelter.orphanage.address || ""} onChange={handleShelterChange} placeholder="Адрес" type="text" />
                      </Form.Field>
                      <Form.Field>
                        <label htmlFor="orphanage.phone">Имя</label>
                        <input aria-label="Имя" aria-required={true} id="orphanage.phone" name="shelter.orphanage.phone" value={props.state.shelter.orphanage.phone || ""} onChange={handleShelterChange} placeholder="Телефон" type="text" />
                      </Form.Field>
                    </React.Fragment>}
                  {props.state.parents === "guardian" && <React.Fragment>
                      <Form.Field>
                        <label htmlFor="guardian.name_l">Фамилия</label>
                        <input aria-label="Фамилия" aria-required={true} id="guardian.name_l" name="shelter.guardian.name_l" value={props.state.shelter.guardian.name_l || ""} onChange={handleShelterChange} placeholder="Фамилия" type="text" />
                      </Form.Field>
                      <Form.Field>
                        <label htmlFor="guardian.name_f">Имя</label>
                        <input aria-label="Имя" aria-required={true} id="guardian.name_f" name="shelter.guardian.name_f" value={props.state.shelter.guardian.name_f || ""} onChange={handleShelterChange} placeholder="Имя" type="text" />
                      </Form.Field>
                      <Form.Field>
                        <label htmlFor="guardian.patronymic">Отчество</label>
                        <input aria-label="Отчество" aria-required={true} id="guardian.patronymic" name="shelter.guardian.patronymic" value={props.state.shelter.guardian.patronymic || ""} onChange={handleShelterChange} placeholder="Отчество" type="text" />
                      </Form.Field>
                      <Form.Field>
                        <label htmlFor="guardian.phone">Номер телефона</label>
                        <input aria-label="Номер телефона" aria-required={true} id="guardian.phone" name="shelter.guardian.phone" value={props.state.shelter.guardian.phone || ""} onChange={handleShelterChange} placeholder="Номер телефона" type="text" />
                      </Form.Field>
                    </React.Fragment>}
                </Form.Group>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                {props.state.responseStatus === 200 || (props.state.responseStatus === 201 && <Message success header="Форма отправлена успешно!" />)}
                {props.state.error && <Message error header="Неправильно заполнена форма!" />}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns="equal" centered>
              <Grid.Column width="4" />
              <Grid.Column width="6" textAlign="center">
                <h2 className="questionnaire">Заполните анкету</h2>
              </Grid.Column>
              <Grid.Column width="4" textAlign="right">
                <Button aria-label="Send request" animated="fade" primary type="submit">
                  <Button.Content visible>Отправить заявку</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    </FormStyle>;
};

export default WithForm(FormComponent);
