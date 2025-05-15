import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DollarSign as DollarSignIcon,
  ShoppingCart as ShoppingCartIcon,
} from "lucide-react";
import { Grid, Snackbar, Typography } from "@mui/material";
import { io } from "socket.io-client";
import {
  StyledContainer,
  Item,
  CardHeader,
  IconStyle,
  StyledAlert,
} from "./styles";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);
  const [newOrderAlertOpen, setNewOrderAlertOpen] = useState(false);
  const [newOrderData, setNewOrderData] = useState(null);
  const socket = io("http://localhost:3001");

  useEffect(() => {
    async function fetchDados() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3001/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    }

    fetchDados();
    socket.on("newOrder", (order) => {
      setNewOrderData(order);
      setNewOrderAlertOpen(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCloseNewOrderAlert = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNewOrderAlertOpen(false);
    setNewOrderData(null);
  };

  if (!dados) return <p>Carregando dados...</p>;

  return (
    <StyledContainer maxWidth="lg">
      <Grid container spacing={3}></Grid>
        {/* Card de Faturamento */}
        <Grid item xs={12} sm={6} md={3}>
          <Item>
            <CardHeader>
              <DollarSignIcon color="#4caf50" style={IconStyle} />
              <Typography variant="subtitle1">Faturamento</Typography>
            </CardHeader>
            <Typography variant="h5">
              R$ {dados.faturamento ? dados.faturamento.toLocaleString() : "0,00"}
            </Typography>
          </Item>
        </Grid>

        {/* Card: Total de Pedidos */}
        <Grid item xs={12} sm={6} md={3}>
          <div onClick={() => navigate("/admin/pedidos")} style={{ cursor: 'pointer' }}>
            <Item>
              <CardHeader>
                <ShoppingCartIcon color="#1976d2" style={IconStyle} />
                <Typography variant="subtitle1">Total de Pedidos</Typography>
              </CardHeader>
              <Typography variant="h5">
                {dados.pedidos ? dados.pedidos : "0"}
              </Typography>
            </Item>
          </div>
        </Grid>

        <Snackbar
          open={newOrderAlertOpen}
          autoHideDuration={5000}
          onClose={handleCloseNewOrderAlert}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <StyledAlert onClose={handleCloseNewOrderAlert} severity="success">
            Novo pedido realizado! #{newOrderData?.id || "..."}
          </StyledAlert>
        </Snackbar>
    </StyledContainer>
  );
}
