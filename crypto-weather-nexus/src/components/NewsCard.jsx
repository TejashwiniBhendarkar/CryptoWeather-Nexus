"use client";

const NewsCard = ({ news }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <img
        src={news.image_url || "/images/news-placeholder.jpg"}
        alt={news.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-xl font-semibold mt-4">{news.title}</h3>
      <p className="text-gray-600 text-sm mt-2">{news.description}</p>
      <a
        href={news.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-blue-600 font-medium mt-4 hover:underline"
      >
        Read More →
      </a>
    </div>
  );
};

export default NewsCard;
