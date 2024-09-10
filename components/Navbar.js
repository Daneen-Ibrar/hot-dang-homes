import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaHouseUser, FaHeart } from 'react-icons/fa';

const GET_MENU_ITEMS_QUERY = `
  query GetMenuItems {
    menuItems(where: { location: HCMS_MENU_HEADER }) {
      edges {
        node {
          id
          label
          uri
          childItems {
            edges {
              node {
                id
                label
                uri
              }
            }
          }
        }
      }
    }
  }
`;

const GRAPHQL_ENDPOINT = 'http://hot-dang-homes-course.local/graphql';

function Navbar() {
  const [menuItems, setMenuItems] = useState([]);


  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: GET_MENU_ITEMS_QUERY }),
        });

        const result = await response.json();
        const fetchedMenuItems = result.data.menuItems.edges;

        // Find the URI for "Contact Us" and filter out "Contact Us" from the main menu items
      

        // Filter out child items from appearing as main navigation items
        const childIDs = new Set();
        fetchedMenuItems.forEach(item => {
          item.node.childItems.edges.forEach(child => {
            childIDs.add(child.node.id);
          });
        });

        const filteredMenuItems = fetchedMenuItems
          .filter(item => item.node.label !== 'Contact us') // Exclude "Contact Us"
          .filter(item => !childIDs.has(item.node.id)); // Exclude items that have child items

        setMenuItems(filteredMenuItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);


      const contactUsItem = "https://github.com/Daneen-Ibrar"
  return (

    <div className="bg-navy-900 text-white p-3.5 flex justify-between items-center">
      <div>
        <Link href="/" legacyBehavior>
          <a className="flex items-center ml-7">
            <FaHouseUser className="text-pink-700 text-3xl" />
            <FaHeart className="text-pink-700 text-3xl" />
          </a>
        </Link>
      </div>
      <div className="flex items-center space-x-8 mr-2">
        {menuItems.map((menuItem) => {
          const hasChildItems = menuItem.node.childItems.edges.length > 0;

          return (
            <div key={menuItem.node.id} className="group relative">
              {/* Always display the parent menu item */}
              <Link href={!hasChildItems ? menuItem.node.uri : "#"} legacyBehavior>
                <a
                  className={`font-body px-1.5 py-1.5 rounded transition-all duration-300 ${
                    hasChildItems ? 'hover:bg-gray-700' : ''
                  }`}
                >
                  {menuItem.node.label}
                </a>
              </Link>

              {/* Conditionally render the dropdown for child items */}
              {hasChildItems && (
                <div
                  className="hidden group-hover:block absolute bg-navy-900 text-white mt-[9px] rounded shadow-md z-50"
                  style={{ minWidth: '200px', left: 0 }}
                >
                  {menuItem.node.childItems.edges.map((child) => (
                    <Link key={child.node.id} href={child.node.uri} legacyBehavior>
                      <a className="font-body block hover:bg-gray-700 px-4 py-2">
                        {child.node.label}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {contactUsItem && (
          <Link href={contactUsItem} legacyBehavior>
            <a
              className="font-body font-bold bg-pink-500 text-white hover:bg-pink-600 px-4 py-2 rounded transition-all duration-300"
            >
              MY GITHUB
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
