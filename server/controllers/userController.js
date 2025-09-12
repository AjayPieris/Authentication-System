import userModel from "../Models/userModel";

export const getUserData = async (req, res) => {
  const userId = req.body;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, 
        userData: {
          name: user.name,
          email: user.email,
          isAccountVerified: user.isAccountVerified,
          createdAt: user.createdAt,
        }
     });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
