
export default function getHealth(req,res)
{
    const health = {
        status :"OKA",
        uptime : process.uptime(),
        timestamp : new Date()
    }

    res.status(200).json(health)
}