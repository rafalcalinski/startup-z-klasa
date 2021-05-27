using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class shoting : MonoBehaviour
{

    public Transform Point;
    public GameObject bulletPrefab;
    public GameObject bullet2Prefab;

    public float bulletForce = 20f;

    // Update is called once per frame
    void Update()
    {
        if(Input.GetButton("Fire1"))
        {
            Shoot();
        }
        if(Input.GetButton("Fire2"))
        {
            Shoot2();
        }
    }

    void Shoot2()
    {
        GameObject bullet2 = Instantiate(bullet2Prefab, Point.position, Point.rotation);
        Rigidbody2D rb = bullet2.GetComponent<Rigidbody2D>();
        rb.AddForce(Point.up * bulletForce, ForceMode2D.Impulse);
    }


    void Shoot()
    {
        GameObject bullet = Instantiate(bulletPrefab, Point.position, Point.rotation);
        Rigidbody2D rb = bullet.GetComponent<Rigidbody2D>();
        rb.AddForce(Point.up * bulletForce, ForceMode2D.Impulse);
    }
    
}
