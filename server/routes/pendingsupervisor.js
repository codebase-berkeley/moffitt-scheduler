var router = express.Router();

router.post("/pendingsupervisor", (req, res) => {
  var approve = req.body.approve;
  console.log("approve", approve);
  res.json({ Successful: true });
});

module.exports = router;
