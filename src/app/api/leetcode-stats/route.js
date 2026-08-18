import { NextResponse } from "next/server";

const LEETCODE_USERNAME = "Shankar_Jangid";

export const revalidate = 3600; // 1 hour cache

export async function GET() {
  try {
    // 1. Try public LeetCode GraphQL query
    const graphqlQuery = {
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            submissionCalendar
            profile {
              ranking
              userAvatar
              realName
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
              totalSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            badges {
              displayName
              icon
            }
          }
          allQuestionsCount {
            difficulty
            count
          }
        }
      `,
      variables: { username: LEETCODE_USERNAME },
    };

    let totalSolved = 700;
    let easySolved = 250;
    let mediumSolved = 380;
    let hardSolved = 70;
    let acceptanceRate = 68.5;
    let ranking = 120000;
    let avatarUrl = "https://assets.leetcode.com/users/default_avatar.jpg";
    let realName = "Shankar Jangid";

    try {
      const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
        },
        body: JSON.stringify(graphqlQuery),
        next: { revalidate: 3600 },
      });

      if (response.ok) {
        const data = await response.json();
        const user = data?.data?.matchedUser;
        if (user) {
          const subs = user.submitStats?.acSubmissionNum || [];
          const allSubs = user.submitStats?.totalSubmissionNum || [];

          const allObj = subs.find((s) => s.difficulty === "All");
          const easyObj = subs.find((s) => s.difficulty === "Easy");
          const medObj = subs.find((s) => s.difficulty === "Medium");
          const hardObj = subs.find((s) => s.difficulty === "Hard");

          if (allObj?.count) totalSolved = allObj.count;
          if (easyObj?.count) easySolved = easyObj.count;
          if (medObj?.count) mediumSolved = medObj.count;
          if (hardObj?.count) hardSolved = hardObj.count;

          const totalSubmissions = allSubs.find((s) => s.difficulty === "All")?.submissions || 0;
          if (totalSubmissions > 0 && allObj?.submissions) {
            acceptanceRate = parseFloat(((allObj.submissions / totalSubmissions) * 100).toFixed(1));
          }

          if (user.profile?.ranking) ranking = user.profile.ranking;
          if (user.profile?.userAvatar) avatarUrl = user.profile.userAvatar;
          if (user.profile?.realName) realName = user.profile.realName;
          var submissionCalendar = user.submissionCalendar || "{}";
        }
      }
    } catch (e) {
      console.warn("[leetcode-stats] Primary GraphQL failed, using fallback:", e.message);
    }

    // Return structured payload
    return NextResponse.json({
      username: LEETCODE_USERNAME,
      realName,
      profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
      avatarUrl,
      ranking,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      acceptanceRate,
      easyTotal: 830,
      mediumTotal: 1750,
      hardTotal: 750,
      totalQuestions: 3330,
      submissionCalendar: typeof submissionCalendar !== "undefined" ? submissionCalendar : "{}",
    });
  } catch (error) {
    console.error("[leetcode-stats] Error:", error.message);
    return NextResponse.json({
      username: LEETCODE_USERNAME,
      profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
      ranking: 150000,
      totalSolved: 700,
      easySolved: 250,
      mediumSolved: 380,
      hardSolved: 70,
      acceptanceRate: 68.5,
      easyTotal: 830,
      mediumTotal: 1750,
      hardTotal: 750,
      totalQuestions: 3330,
    });
  }
}
