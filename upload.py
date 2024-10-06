from langchain_community.document_loaders import PyPDFLoader
import getpass, os, pymongo, pprint
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from pymongo import MongoClient
from pymongo.operations import SearchIndexModel
import asyncio
import pymongo
import os
from dotenv import load_dotenv  # Import load_dotenv from dotenv
load_dotenv()  # Load environment variables from .env file
file_path = '/Users/boubalkaly/Desktop/devhacks/ila-1553.pdf';
loader = PyPDFLoader(file_path)
async def load_pages():
    pages = []
    async for page in loader.alazy_load():
        pages.append(page)
    return pages


async def upload_data():
    try:
        
        client = pymongo.MongoClient('mongodb+srv://boomoha:wXohzL8lNUuDJPtr@boohoma.e9lur.mongodb.net/?retryWrites=true&w=majority&appName=boohoma')
        database = client["synapsED"]
        collection = database["linear_algebra"]
        vector_search_index = 'interactive_linear_algebra'
        loader = PyPDFLoader("/Users/boubalkaly/Desktop/devhacks/ila-1553.pdf")
        data = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=20)
        docs = text_splitter.split_documents(data)
        vector_store = MongoDBAtlasVectorSearch.from_documents(
        documents = docs,
        embedding = OpenAIEmbeddings(disallowed_special=()),
        collection = 'linear_algebra',
        index_name = vector_search_index
        
)

        # pages = await load_pages()
        # for page in pages:
        #     data = {
        #         'origin': file_path,
        #         'content': page.page_content
                
        #     }
        #     page_id = collection.insert_one(data).inserted_id
        #     print(f"Inserted page with id: {page_id}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    asyncio.run(upload_data())
# Try to create a MongoDB client and connect to the server