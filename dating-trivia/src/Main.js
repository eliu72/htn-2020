class App extends React.Component {
    state = {
      data: [
        {
          title: "Hi",
          options: [
            { code: "Option 1", label: "Option 1" },
            { code: "Option 2", label: "Option 2" },
            { code: "Option 3", label: "Option 3" }
          ]
        }
      ],
      current: {}
    };
  
    render() {
      let data = this.state.data.map(code => {
        return (
          <div className="form-part">
            <h3>{code.title}</h3>
            {code.options.map(option => (
              <label>
                <input type="text" value={option.code} />
                {option.label}
              </label>
            ))}
          </div>
        );
      });
  
      return (
        <div className="App">
          <form>{data}</form>
        </div>
      );
    }
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);