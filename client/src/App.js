import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
});
const App = (props) => {
  const { classes } = props;
  const [customers, setCustomers] = useState("");
  const [completed, setCompleted] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  
  useEffect(() => {
    let complete = 0;
    let timer = setInterval(() => {
      if (complete >= 100) {
        complete = 0
      } else {
        complete += 1;
      }
      setCompleted(complete);
      if (isLoad) {
        clearInterval(timer);
      }
    }, 20);
    callApi().then(res => {
      setCustomers(res);
    }).
      catch(err => console.log(err));
  }, [isLoad]);

  const callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    setIsLoad(true);
    return body;
  }

  const sendPropsCallApi = () => {
    callApi().then(res => {
      setCustomers(res);
    }).
      catch(err => console.log(err));
  }

  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>설정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              customers ? customers.map(c => {
                return <Customer
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                  sendPropsCallApi={sendPropsCallApi}
                />
              }) :
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progess} variant='determinate' value={completed} />
                  </TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd sendPropsCallApi={sendPropsCallApi}/>
    </div>
  );
}

export default withStyles(styles)(App);
