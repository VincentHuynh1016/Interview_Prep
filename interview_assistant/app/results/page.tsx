"use client";
import { useEffect, useState } from "react";
import { TrendingUp, Award, MessageSquare } from "lucide-react";

export default function Results() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/results");
        const data = await res.json();

        console.log("RAW API RESPONSE:", data);
        console.log("QUALITY SCORES:", data.results?.qualityScore);
        console.log("SENTIMENT SCORES:", data.results?.sentiment);
        
        setResults(data.results);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">No results available</div>
      </div>
    );
  }

  // Calculate averages
  const avgQuality =
    results.qualityScore?.reduce((a: number, b: number) => a + b, 0) /
      results.qualityScore?.length || 0;
  const avgSentimentPositive =
    results.sentiment?.reduce((a: number, s: number[]) => a + s[1], 0) /
      results.sentiment?.length || 0;

  // Convert to percentages
  const qualityPercent = (avgQuality * 100).toFixed(1);
  const sentimentPercent = (avgSentimentPositive * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate-800 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-slate-600 rounded"></div>
          <span className="font-semibold">Interview Analysis</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Overall Scores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Average Quality Score */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 56 * (1 - avgQuality)
                      }`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">
                      {qualityPercent}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-medium">AVG QUALITY</span>
                </div>
              </div>
            </div>

            {/* Average Sentiment */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 56 * (1 - avgSentimentPositive)
                      }`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">
                      {sentimentPercent}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">AVG SENTIMENT</span>
                </div>
              </div>
            </div>

            {/* Total Questions */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
                  <span className="text-5xl font-bold text-gray-800">
                    {results.qualityScore?.length || 0}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-medium">QUESTIONS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Scores */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Question Breakdown
          </h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Question
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quality Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sentiment (Negative)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sentiment (Positive)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.qualityScore?.map(
                    (quality: number, index: number) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Question {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${quality * 100}%` }}
                              ></div>
                            </div>
                            <span className="font-medium">
                              {(quality * 100).toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-red-500 h-2 rounded-full"
                                style={{
                                  width: `${
                                    results.sentiment[index][0] * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <span className="font-medium">
                              {(results.sentiment[index][0] * 100).toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{
                                  width: `${
                                    results.sentiment[index][1] * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <span className="font-medium">
                              {(results.sentiment[index][1] * 100).toFixed(1)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        {results.feedback && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Detailed Feedback
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                  {results.feedback}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
