interface employee {
    code: number,
    name: string
}

(() => {
    const employeeJohn : employee = {
        code: 10,
        name: "John"
    }
    console.log(employeeJohn.name)
})();