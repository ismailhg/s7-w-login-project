import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const validate = (values) => {
    const newErrors = {};

    if (!values.email) {
      newErrors.email = "Email zorunludur.";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Geçerli bir email adresi giriniz.";
    }

    if (!values.password) {
      newErrors.password = "Şifre zorunludur.";
    } else if (!passwordRegex.test(values.password)) {
      newErrors.password =
        "Şifre en az 8 karakter, 1 büyük harf, 1 küçük harf ve 1 sayı içermelidir.";
    }

    return newErrors;
  };

  useEffect(() => {
    setErrors(validate(form));
  }, [form]);

  const isFormValid =
    !errors.email &&
    !errors.password &&
    form.email !== "" &&
    form.password !== "" &&
    form.terms;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    axios
      .get("https://6540a96145bedb25bfc247b4.mockapi.io/api/login")
      .then((res) => {
        const user = res.data.find(
          (item) => item.email === form.email && item.password === form.password
        );

        if (user) {
          setForm(initialForm);
          navigate("/Success");
        } else {
          navigate("/error");
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          data-cy="form-email"
        />
        {form.email !== "" && errors.email && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.email}</p>
        )}
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          data-cy="form-password"
        />
        {form.password !== "" && errors.password && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.password}</p>
        )}
      </FormGroup>

      <FormGroup>
        <Input
          type="checkbox"
          name="terms"
          id="terms"
          onChange={handleChange}
          checked={form.terms}
          data-cy="form-terms"
        />
        <Label htmlFor="terms">
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>

      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isFormValid} data-cy="form-button">
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
