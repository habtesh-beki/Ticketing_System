import { app } from "./api/api";

const PORT = 3000

app.listen(PORT , () =>{
    console.log(`server listning on port ${PORT}`)
})