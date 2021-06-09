const statusMessages = {
    Signup_Success_Message : 'Sign up successfully',
    Signup_Already_User_Exist_Message : 'User already exist',
    Login_Success_Messages : 'Successfully logged-in',
    Login_Invalid_Email_Message : 'Invalid Email Id provided',
    Login_Invalid_Password_Message : 'Invalid password',
    Add_Rss_Subscription_Invalid_UserID : "UserId not correct",
    Add_Rss_Subscription_Success_Message : "Rss feed Subscribed Sucessfully",
    Add_Rss_Subscription_Already_Subscribed_Message : "Already Subscribed to this rss site",
    Fetch_Rss_Subscription_List_Success : "Sucessfully fetched the Subscription list",
    Fetch_Available_Rss_Sites : " Successfully fetched the available Rss sites",
    Feed_Fetch_And_Store_Success_Message : "Rss Feed fetched and Stored Successfully",

    FeedFetch_No_New_Feed_published : "No new feed Published, try after some time",
    FeedFetch_And_Stored_Success : " Rss feeds fetched and stored successfully",
    FeedFetch_Done_Recently_Only : "Fetch recently only done, try after some time",
    FeedFetch_Without_RssSiteDetails_Error : "Without rss Site details We cant fetch the feeds",

    AddRssSite_Url_Already_Present = "Given Rss Url already present",
    AddRssSite_Success = "Rss site added successfully",

    AddRssSubscription_RssSiteId_Not_Populated_Error = "Rss site id not populated",
    Given_RssSite_Not_Registered: StoreFeed_RssSite_Not_Registered = "Given Rss Site is not registered",
    FeedFetch_Success = "Rss site feeds fetched sucessfully",

}

module.exports = statusMessages;