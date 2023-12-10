import {
  Typography,
  useTheme,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

const OrdinazioneSingolaDaEvadere = (props) => {
  const { ordinazione, modificaPreparazionePiatto } = props;

  const { auth } = useAuth();

  const orarioAttuale = new Date();
  const orarioOrdinazione = new Date(ordinazione.orarioOrdinazione);

  const [elapsed, setElapsed] = useState(
    orarioAttuale.getTime() - orarioOrdinazione.getTime()
  );

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
      seconds
    )}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(elapsed + 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [elapsed]);

  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.semitransparent,
        borderRadius: "10px",
        p: "5px",
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography variant="h6" component="h1">
            <b>ORDINAZIONE N° {ordinazione.idOrdinazione}</b>
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          justifyContent="flex-end"
          display="flex"
        >
          <Typography variant="h6" component="h1">
            {convertMsToTime(elapsed)}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h6" component="h1">
        <b>TAVOLO N° {ordinazione.tavolo.numeroTavolo}</b>
      </Typography>
      <br />
      <hr color={theme.palette.black.main} />
      <List>
        {ordinazione.preparazioni.map((preparazione) => (
          <ListItem
            key={preparazione.idPreparazionePiattoOrdinazione}
            alignItems="flex-start"
            secondaryAction={
              preparazione.statoPreparazione === "Evaso" ? (
                <Button variant="contained" disabled>
                  <b>Evaso</b>
                </Button>
              ) : preparazione.statoPreparazione === "Da preparare" ? (
                <Button
                  variant="contained"
                  onClick={() =>
                    modificaPreparazionePiatto(preparazione, "In preparazione")
                  }
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.white.main,
                  }}
                >
                  <b>Prepara</b>
                </Button>
              ) : preparazione.statoPreparazione === "In preparazione" ? (
                preparazione.idDipendente !== auth?.dipendente?.idDipendente ? (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: theme.palette.fourtiary.main,
                      color: theme.palette.white.main,
                    }}
                  >
                    <b>In preparazione</b>
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() =>
                      modificaPreparazionePiatto(preparazione, "Evaso")
                    }
                    sx={{
                      backgroundColor: theme.palette.tertiary.main,
                      color: theme.palette.white.main,
                    }}
                  >
                    <b>Evadi</b>
                  </Button>
                )
              ) : (
                <></>
              )
            }
          >
            <ListItemText
              primaryTypographyProps={{ fontSize: "20px" }}
              secondaryTypographyProps={{ fontSize: "16px" }}
              primary={preparazione.quantita + "x " + preparazione.piatto.nome}
              secondary={preparazione.nota ? <>• {preparazione.nota}</> : <></>}
              sx={{ maxWidth: "60%" }}
            ></ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OrdinazioneSingolaDaEvadere;
