import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { getCloseSecurities } from "../states/securities";
import { useDispatch, useSelector } from "react-redux";

const AssignForm = ({ vigilantes }) => {
  const [guardia, setGuardia] = React.useState(vigilantes[0]);
  const dispatch = useDispatch();
  // const closeSecurities = useSelector((state) => state.securities);
  const branch = useSelector((state) => state.branch);

  useEffect(() => {
    dispatch(getCloseSecurities(branch));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const options = vigilantes?.map((guardia, i) => {
    return (
      <option key={i} value={i}>
        {guardia.name} {guardia.lastName} --- {guardia.address}
      </option>
    );
  });

  const handleClick = async (data) => {
    // console.log("DATA DE ASING", data);

    try {
      guardia ? (
        await axios({
          method: "POST",
          url: "/api/admin/add/Calendar/security",
          data: {
            name: guardia.name,
            wishEntryHour: data.ingreso,
            wishClosingHour: data.egreso,
          },
        })
      ) : (
        <p>no hay vigiladores </p>
      );
      swal({
        title: "Vigilador asignado",
        text: ".",
        icon: "success",
        button: "Aceptar",
      });
    } catch (err) {
      swal({
        title: err,
        text: ".",
        icon: "success",
        button: "Aceptar",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleClick)}>
      <div className="row mt-3">
        <div className="col-md-12">
          <Form.Label className="labels">Seleccione un vigilador</Form.Label>
          <Form.Control
            style={{ width: "200px" }}
            as="select"
            size="ms"
            className="position-relative"
            name="security"
            variant="outlined"
            {...register("security", {
              required: {
                value: true,
                message: "Necesitas este campo",
              },
            })}
          >
            {options}
          </Form.Control>
        </div>
      </div>
      <div>
        <Form.Label className="labels">CUIL</Form.Label>
        <Form.Control
          size="ms"
          className="position-relative"
          variant="outlined"
          disabled="true"
          value={guardia ? guardia.CUIL : ""}
        />
      </div>
      <div>
        <Form.Label className="labels">Dirección</Form.Label>
        <Form.Control
          size="ms"
          className="position-relative"
          variant="outlined"
          disabled="true"
          value={guardia ? guardia.direccion : ""}
        />
      </div>
      <div className="row mt-2">
        <div className="col-md-6">
          <Form.Label className="labels">Ingreso</Form.Label>
          <Form.Control
            name="ingreso"
            size="ms"
            placeholder="Nombre"
            className="position-relative"
            variant="outlined"
            type="time"
            {...register("ingreso", {
              required: {
                value: true,
                message: "Necesitas este campo",
              },
            })}
          />
        </div>
        <div className="col-md-6">
          <Form.Label className="labels">Egreso</Form.Label>
          <Form.Control
            name="egreso"
            size="ms"
            placeholder="Apellido"
            className="position-relative"
            variant="outlined"
            type="time"
            {...register("egreso", {
              required: {
                value: true,
                message: "Necesitas este campo",
              },
            })}
          />
        </div>
      </div>
      <div id="assignBtn" className="text-center">
        <Button type="submit" variant="secondary" style={{ marginTop: "5px" }}>
          Asignar
        </Button>
      </div>
    </form>
  );
};

export default AssignForm;
